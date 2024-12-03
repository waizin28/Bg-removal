import { Webhook } from 'svix';
import userModel from '../models/userModel.js';

// API Controller Function to Manage Clerk User with database
// http://localhost:4000/api/user/webhooks

// get info about use when user logged in
const clerkWebHooks = async (req, res) => {
  try {
    // create a Svix instance with clerk webhook secret
    const webHook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await webHook.verify(JSON.stringify(req.body), {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature'],
    });

    // data will contain user data, type => some kind of evernt (user.created)
    const { data, type } = req.body;

    switch (type) {
      case 'user.created': {
        // create user in database
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await userModel.create(userData);
        res.status(200).json({ sucess: true, message: 'User created' });
        break;
      }
      case 'user.updated': {
        // update user data in database
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        res.status(200).json({ sucess: true, message: 'User updated' });

        break;
      }
      case 'user.deleted': {
        // delete user in database
        await userModel.findOneAndDelete({ clerkId: data.id });
        res.status(200).json({ sucess: true, message: 'User deleted' });
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ sucess: false, message: error.message });
  }
};

export { clerkWebHooks };
