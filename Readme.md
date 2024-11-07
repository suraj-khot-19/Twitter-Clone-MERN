<div align="center">
    Twitter Clone Using MERN
</div>
<ul>
<!-- auth -->
    <li>
    AUTH ROUTERS
    <ul>
    <!-- signup -->
        <li>
        Signup
            <ul>
                <li>password<img src="./output/i3.png"></li>
                <li>exists<img src="./output/i2.png"></li>
                <li>new<img src="./output/i1.png"></li>
            </ul>
        </li>
    <!-- login -->
    <li>
        Login
            <ul>
                <li>username incorrect<img src="./output/i6.png"></li>
                <li>username/pass incorrect<img src="./output/i5.png"></li>
                <li>login<img src="./output/i4.png"></li>
                <li>jwt code in cookie<img src="./output/i7.png"></li>
            </ul>
        </li>  
    <!-- logout -->
    <li>
        Logout
            <ul>
                <li>logout<img src="./output/i8.png"></li>
                <li>jwt code in cookie<img src="./output/i9.png"></li>
            </ul>
        </li>
    <!-- get user data only if his/her session is valid -->
    <li>
        get user data only if his/her session is valid
            <ul>
                <li>no jwt in cookie<img src="./output/i10.png"></li>
                <li>jwt code in cookie then user<img src="./output/i11.png"></li>
            </ul>
        </li>
    </ul>
    </li>
<!-- user -->
<li>
    USER ROUTERS
    <ul>
    <!-- get user profile -->
        <li>
        get user profile
            <ul>
                <li>if user not logged in<img src="./output/i13.png"></li>
                <li>if user not found<img src="./output/i14.png"></li>
                <li>if user<img src="./output/i12.png"></li>
            </ul>
        </li>
        <!-- follow/unfollow -->
         <li>
        follow/unfollow
            <ul>
                <li>if trying to follow self<img src="./output/i15.png"></li>
                <li>follow if :id is not include in current user array <img src="./output/i16.png"></li>
                <li>unfollow if :id is include in current user array <img src="./output/i17.png"></li>
            </ul>
        </li>
        <!-- notification -->
         <li>
        notification
            <ul>
                <li>notification update <img src="./output/i18.png"></li>
            </ul>
        </li> 
        <!-- suggetions -->
         <li>
        suggetions
            <ul>
                <li>if followed 
                    <ul>
                        <li>if followed someone <img src="./output/i19.png"></li>
                        <li>then not suggest that user <img src="./output/i20.png"></li>
                    </ul>
                </li>
                <li>if *not followed 
                    <ul>
                        <li>if not followed someone <img src="./output/i21.png"></li>
                        <li>then getting suggestion of that user <img src="./output/i22.png"></li>
                    </ul>
                </li>
            </ul>
        </li>
        <!-- update profile  -->
           <li>
        update profile 
            <ul>
                <li>before profile update<img src="./output/i23.png"></li>
                <li>update<img src="./output/i24.png"></li>
                <li>after profile update<img src="./output/i25.png"></li>
            </ul>
        </li> 
        <!-- update password -->
         <li>
        update password 
            <ul>
                <li>only passing update password<img src="./output/i26.png"></li>
                <li>passing new password less than 6 char<img src="./output/i27.png"></li>
                <li>passing current password as wrong one<img src="./output/i28.png"></li>
                <li>passing new password same as before<img src="./output/i29.png"></li>
                <li>evrything ok<img src="./output/i30.png"></li>
                <li>now test login with old password<img src="./output/i31.png"></li>
                <li>now test login with updated password<img src="./output/i32.png"></li>
            </ul>
        </li> 
    </ul>
    <!-- posts -->
    <li>
    Post Routers
        <ul>
        <!-- create new post -->
            <li>
            create new post 
                <ul>
                    <li>if post is blank<img src="./output/i33.png"></li>
                    <li>if post contains data<img src="./output/i34.png"></li>
                    <li>db<img src="./output/i37.png"></li>
                    </ul>
            </li>
        <!-- delete a post -->
        <li>
            delete a post 
                <ul>
                    <li>all posts in db<img src="./output/i37.png"></li>
                    <li>if post not exists<img src="./output/i36.png"></li>
                    <li>if there then delete<img src="./output/i35.png"></li>
                    <li>after delete db<img src="./output/i38.png"></li>
                    </ul>
            </li>
        </ul>
    </li>
</ul>
