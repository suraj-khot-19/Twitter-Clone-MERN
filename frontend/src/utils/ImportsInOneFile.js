import userimg from '../assets/userimg.png'
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import ViewSvg from '../assets/ViewSvg'
import PostSvg from '../assets/PostSvg'
import demo from '../assets/demo.png'
import cover from '../assets/cover.png'
import { Link } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MyFollowButton, MyLoading, MyUnFollowButton } from '../components/common/MyButton'
import AllPostsSkelton from '../components/skeletons/AllPostsSkelton';
import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import LeftSideBar from '../components/sidebar/LeftSideBar';
import RightSideBar from '../components/sidebar/RightSideBar';
import { IoArrowBack, IoLocationOutline } from "react-icons/io5";
import SoloUserFollowContainer from '../components/profile/SoloUserFollowContainer';
import { SlCalender } from "react-icons/sl";
import { MdEdit, MdOutlineVerifiedUser } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import X from '../assets/X';
import { CgMoreO } from "react-icons/cg";
import { GoHomeFill } from "react-icons/go";
import { IoNotifications } from "react-icons/io5";
import WhoToFollow from '../components/skeletons/WhoToFollow';
import CreatePost from '../components/post/CreatePost';
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import UserProfile from '../components/profile/UserProfile';
import ProfileSkelton from '../components/skeletons/ProfileSkelton';
import Login from '../pages/authentication/Login';
import Home from '../pages/home/Home'
import Signup from '../pages/authentication/Signup'
import Profile from '../pages/profile/Profile'
import FollowerFollowingPage from '../components/profile/FollowerFollowingPage'
import BottomNavBar from '../components/sidebar/BottomNavBar'
import SinglePostWithProp from '../components/post/SinglePostWithProp';
import AllPosts from '../components/post/AllPosts'
import { RiMore2Fill } from "react-icons/ri";

export {
     RiMore2Fill, SinglePostWithProp, Login, Home, Signup, Profile, FollowerFollowingPage, BottomNavBar, ProfileSkelton, UserProfile,  FcGoogle, AiOutlineUser, RiLockPasswordFill, FaApple, MyFollowButton, MyUnFollowButton, CreatePost, WhoToFollow, IoNotifications, GoHomeFill, CgMoreO, X, PostSvg, BiRepost, GoHome, FaSearch, IoNotificationsOutline, FaRegUser, FaRegComment, FaRegHeart, IoSettingsOutline, Link, MyLoading, RiDeleteBin6Line, ViewSvg, demo, userimg, AllPostsSkelton, CiImageOn, BsEmojiSmileFill, LeftSideBar, RightSideBar, IoArrowBack, SoloUserFollowContainer, IoLocationOutline, SlCalender, MdEdit, MdOutlineVerifiedUser, AllPosts, cover,
}
