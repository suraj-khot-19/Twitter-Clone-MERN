import Notification from "../model/notification.model.js"

/// !   get notification of current user
export const getUsersNotification = async (req, res) => {
    try {
        //get id from middleware
        const uid = req.user._id;

        //all notifications
        const noti = await Notification.find({ to: uid }).sort({ createdAt: -1 })
            .populate({
                path: 'from',
                select: "username profileImg" // selecting only two
            });

        //after seen notification for this user convert read to true
        await Notification.updateMany({ user: uid }, { read: true })

        //send res
        res.status(200).json({ notifications: noti })
    } catch (error) {
        console.log("error in get notification,", error.message)
        res.status(500).json({ error: error.message })
    }
}

// !    delete notification ById
export const deleteNotificationById = async (req, res) => {
    try {
        ///get user from middleware
        const uid = req.user._id;

        //get notification id from prams
        const id = req.params.id;

        //find notification
        const notification = await Notification.findById(id);

        //if not
        if (!notification) return res.status(400).json({ msg: "No notification found" })

        //if found check whether this user having rights to delete them
        if (notification.to.toString() === uid.toString()) {
            await Notification.deleteOne(notification);
            res.status(200).json({msg:"notification deleted sucessfully!"})
        }
        else{
            res.status(400).json({msg:"no you dont have rights to delete this notification"})
        }
    } catch (error) {
        console.log("error in delete notification ,",error.message)
        res.status(500).json({error:error.message})
    }
}