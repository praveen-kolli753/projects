import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserLogin from './components/login/userlogin';
import AdminLogin from './components/login/adminlogin';
import MainAdminLogin from './components/login/mainadmin';
import UserSignup from './components/signup/user';
import AdminSignup from './components/signup/admin';
import MainAdminSignup from './components/signup/mainadmin';
import MainAdminHome from './components/adminhome/mainadminhome';
import AdminHome from './components/adminhome/adminhome';
import UserHome from './components/adminhome/userhome';
import Unauthorized from './components/unauthorized';
import ProtectedRoute from './components/protectedroutes';
import AddCourse from './components/daywisecourses/addcourse';
import CourseList from './components/daywisecourses/viewcourses';
import CourseDetail from './components/daywisecourses/coursedetails';
import AdminCourses from './components/daywisecourses/admincources';
import AddContent from './components/daywisecourses/addcontent';
import HomePage from './components/home';
import ViewContent from './components/daywisecourses/viewcontent';
// import ViewCourses from './components/daywisecourses/viewcourses'
import CourseDashboard from './components/daywisecourses/coursedashboard';
import Watch from './components/daywisecourses/watch';
import Home from './components/home/home';
import UserProfile from './components/user/profile';
import UserDashboard from './components/user/userdashboard';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/userdashboard' element={<UserDashboard/>}/>
        <Route path='/profile' element={<UserProfile/>}/>
        <Route path='/view-content/:courseName' element={<ViewContent/>}/>
        <Route path="/course-dashboard/:courseName" element={<CourseDashboard />} />
        <Route path="/watch/:courseName/:dayNumber/:sessionIndex" element={<Watch />} />
        <Route path='/courses/:courseName' element={<CourseDetail/>}/>
        
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/mainadmin-login" element={<MainAdminLogin/>} />
        <Route path="/usersignup" element={<UserSignup/>} />
        <Route path="/adminsignup" element={<AdminSignup  />} />
        <Route path="/mainadminsignup" element={<MainAdminSignup />} />
        <Route path="/view" element={<CourseList />} />
        {/* Protected Routes Main Admin */}
        <Route element={<ProtectedRoute allowedRoles={['main_admin']} />}>
          <Route path="/main-admin-home" element={<MainAdminHome />} />
        </Route>

        {/* Protected Routes  Admin */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin-home" element={<AdminHome />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/add-content/:courseName" element={<AddContent />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admincourses" element={<AdminCourses />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/add-course" element={<AddCourse />} />
        </Route>

        {/* Protected Routes User */}
        <Route element={<ProtectedRoute allowedRoles={['user']} />}>
          <Route path="/user-home" element={<UserHome />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['user']} />}>
          <Route path="/courses" element={<CourseList/>} />
        </Route>
        
        {/* Unauthorized Route */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Catch-all route for unmatched routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};


export default App;