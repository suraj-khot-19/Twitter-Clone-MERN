<div align="center">

### Twitter Clone Using MERN
</div>

<div align="center">


## Table 

<table>
    <tr>
        <td>1.</td>
        <td>

[Authentication Routes](#authentication-routes)
        </td>
    </tr>
    <tr>
        <td>2.</td>
        <td>

[User Routes](#user-routes)
        </td>
    </tr>
    <tr>
        <td>3.</td>
        <td>

[Post Routes](#post-routes)
        </td>
    </tr>
</table>
</div>

<!--! auth -->
### Authentication Routes

   <ul>
    <!-- signup -->
        <li>
        1. Signup
            <ul>
                <li>password must be 6 characters<img src="./output/i3.png"></li> <hr/>
                <li>if username already exists<img src="./output/i2.png"></li> <hr/>
                <li>new username then<img src="./output/i1.png"></li>
            </ul>
        <hr/>
        </li>
    <!-- login -->
    <li>
       2.  Login
            <ul>
                <li>username incorrect<img src="./output/i6.png"></li> <hr/>
                <li>username/pass incorrect<img src="./output/i5.png"></li> <hr/>
                <li>login if all okay<img src="./output/i4.png"></li> <hr/>
                <li>jwt code in cookie<img src="./output/i7.png"></li> 
            </ul>
        </li> 
        <hr/>  
    <!-- logout -->
    <li>
       3. Logout
            <ul>
                <li>logout<img src="./output/i8.png"></li> <hr/>
                <li>jwt code in cookie<img src="./output/i9.png"></li>
            </ul>
        </li> 
        <hr/>
    <!-- get user data only if his/her session is valid -->
    <li>
       4. get user data only if his/her session is valid
            <ul>
                <li>no jwt in cookie<img src="./output/i10.png"></li> <hr/>
                <li>jwt code in cookie then user<img src="./output/i11.png"></li> 
            </ul>
    </li>
    <hr/>

<!--! user -->
### User Routes
<ul>
    <!-- get user profile -->
        <li>
        1. get user profile
            <ul>
                <li>if user not logged in<img src="./output/i13.png"></li> <hr/>
                <li>if user not found<img src="./output/i14.png"></li> <hr/>
                <li>if user<img src="./output/i12.png"></li> 
            </ul>
        </li>
        <hr/>
        <!-- follow/unfollow -->
         <li>
        2. follow/unfollow
            <ul>
                <li>if trying to follow self<img src="./output/i15.png"></li> <hr/>
                <li>follow if :id is not include in current user array <img src="./output/i16.png"></li> <hr/>
                <li>unfollow if :id is include in current user array <img src="./output/i17.png"></li>
            </ul>
        </li> 
        <hr/>
        <!-- notification -->
         <li>
        3. notification
            <ul>
                <li>notification update <img src="./output/i18.png"></li>
            </ul>
        </li>
        <hr/> 
        <!-- suggetions -->
         <li>
        4. suggetions
            <ul>
                <li>if followed 
                    <ul>
                        <li>if followed someone <img src="./output/i19.png"></li> <hr/>
                        <li>then not suggest that user <img src="./output/i20.png"></li>
                    </ul>
                </li>
                <hr/>
                <li>if *not followed 
                    <ul>
                        <li>if not followed someone <img src="./output/i21.png"></li> <hr/>
                        <li>then getting suggestion of that user <img src="./output/i22.png"></li>
                    </ul>
                </li>
            </ul>
        </li>
        <hr/>
        <!-- update profile  -->
           <li>
        5. update profile 
            <ul>
                <li>before profile update<img src="./output/i23.png"></li> <hr/>
                <li>update<img src="./output/i24.png"></li> <hr/>
                <li>after profile update<img src="./output/i25.png"></li>
            </ul>
        </li>
        <hr/> 
        <!-- update password -->
         <li>
        6. update password 
            <ul>
                <li>only passing update password<img src="./output/i26.png"></li> <hr/>
                <li>passing new password less than 6 char<img src="./output/i27.png"></li> <hr/>
                <li>passing current password as wrong one<img src="./output/i28.png"></li> <hr/>
                <li>passing new password same as before<img src="./output/i29.png"></li> <hr/>
                <li>evrything ok<img src="./output/i30.png"></li> <hr/>
                <li>now test login with old password<img src="./output/i31.png"></li> <hr/>
                <li>now test login with updated password<img src="./output/i32.png"></li>
            </ul>
        </li>
        <hr/> 
    </ul>
    
<!--! posts -->

### Post Routes
<ul>
        <!-- create new post -->
            <li>
            1. create new post 
                <ul>
                    <li>if post is blank<img src="./output/i33.png"></li> <hr/>
                    <li>if post contains data<img src="./output/i34.png"></li> <hr/>
                    <li>db<img src="./output/i37.png"></li>
                    </ul>
            </li> 
            <hr/>
        <!-- delete a post -->
        <li>
            2. delete a post 
                <ul>
                    <li>all posts in db<img src="./output/i37.png"></li> <hr/>
                    <li>if post not exists<img src="./output/i36.png"></li> <hr/>
                    <li>if there then delete<img src="./output/i35.png"></li> <hr/>
                    <li>after delete db<img src="./output/i38.png"></li> 
                </ul>
            </li>
            <hr/>
        <!-- comment on a post -->
        <li>
            3. comment on a post 
                <ul>
                    <li>if post not exists<img src="./output/i40.png"></li> <hr/>
                    <li>if there then comment<img src="./output/i41.png"></li> <hr/>
                    <li>comment having text empty<img src="./output/i39.png"></li> <hr/>
                    <li>after comment db<img src="./output/i42.png"></li>
                </ul>
            </li> 
            <hr/>
        <!-- like or unlike -->
        <li>
            4. like or unlike 
                <ul>
                    <li>like a post if likes array not include current logged in user id in them<img src="./output/i43.png"></li> <hr/>
                    <li>db after like<img src="./output/i44.png"></li> <hr/>
                    <li>create a *notification after a like<img src="./output/i48.png"></li> <hr/>
                    <li>unlike a post if likes array includes current logged in user id in them<img src="./output/i46.png"></li> <hr/>
                    <li>delete a *notification after a unlike the same post<img src="./output/i45.png"></li> <hr/>
                    <li>db after unlike<img src="./output/i47.png"></li>
                </ul>
            </li> 
            <hr/>
            <!-- get all posts -->
            <li>5. get all posts 
            <ul>
                 <li>treditional way<img src="./output/i49.png"></li> <hr/>
                 <li>best way to populate user detials in comments and post<img src="./output/i50.png">
                 <pre>
                 ### this one line of code solve problem ###
 const posts = await Post.find({}).sort({ createdAt: -1 }).populate({
            path: 'user',
            select: '-password'
        }).populate({
            path: 'comments.user',
            select: "-password"
        });
                 </pre>
                 </li> 
                 <hr/>
            </ul>
            </li>
            <!-- liked post by user -->
            <li>liked post by user
             <ul>
             <li>changing user model with refrence to post model
             <pre>
liked: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: []
    }
]
             </pre>
             <hr/>
             </li>
                    <li>if user is new<img src="./output/i51.png"></li> <hr/>
                    <li>if user liked two posts(also populating user and post details by using post id itself)<img src="./output/i53.png"></li>
                    <hr/>
                    <li>cross checking me endpoint<img src="./output/i52.png"></li>
                </ul>
            </li>
        </ul>

### 
