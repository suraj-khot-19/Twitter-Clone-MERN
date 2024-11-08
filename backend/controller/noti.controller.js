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
        const notiId = req.params.id;

        //find notification
        const notification = await Notification.findById(notiId);

        //if not
        if (!notification) return res.status(400).json({ msg: "No notification found" })

        //if found check whether this user having rights to delete them
        if (notification.to.toString() === uid.toString()) {
            await Notification.findByIdAndDelete(notiId);
            res.status(200).json({ msg: "notification deleted sucessfully!" })
        }
        else {
            res.status(400).json({ msg: "no you dont have rights to delete this notification" })
        }
    } catch (error) {
        console.log("error in delete notification ,", error.message)
        res.status(500).json({ error: error.message })
    }
}

// !    delete all notification of current user
export const deleteAllNotification = async (req, res) => {
    try {
        //get user id from middleware
        const uid = req.user._id;

        //find those and delete all noti
        await Notification.deleteMany({ to: uid })

        //res.status
        res.status(200).json({ msg: "deleted all notification!" })
    } catch (error) {
        console.log("error in delete all noti,", error.message)
        res.status(500).json({ error: error.message })
    }
} 