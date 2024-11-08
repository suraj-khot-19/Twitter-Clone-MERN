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
