import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Home from './pages/Home';
import Navbar from './components/NavBar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './components/Login-SignUp/Login';
import SignUp from './components/Login-SignUp/SignUp';
import MoreDetailsPage from './pages/MoreDetails';
import AllBooks from './pages/AllBooks';
import Cart from './components/Cart/Cart';
import Profile from './pages/Profile';
import Favoruites from './components/Profile/Favoruites';
import OrderHistory from './components/Profile/Order-History';
import Settings from './components/Profile/Settings';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import VerifyOtp from './components/Forgot-Password/VerifyOtp';

import AdminDashboard from './pages/AdminDashboard'; // Assuming the AdminDashboard page is created
import { authActions } from './Store/authenticate';
import LoadingIndicator from './Loader/LoadingIndicator';
import AddBook from './components/Admin/AddBook';
import EditBook from './components/Admin/EditBook';
import AllOrders from './components/Admin/AllOrders';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const role = localStorage.getItem('role'); // Get the role from localStorage

  useEffect(() => {
    if (
      localStorage.getItem('id') &&
      localStorage.getItem('token') &&
      localStorage.getItem('role')
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem('role')));
    }
    setIsAuthChecked(true); // Mark auth as checked after the login state is restored
  }, [dispatch]);

  if (!isAuthChecked) {
    // Show a loader or blank screen while auth state is being restored
    return <div><LoadingIndicator/></div>;
  }

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to={'/profile'} /> : <Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/forgot-password/verify-otp" element={<VerifyOtp />} />
        <Route path="/more-details/:id" element={<MoreDetailsPage />} />
        <Route path="/all-books" element={<AllBooks />} />

        {/* Admin Route - only if role is admin */}
        {role === 'admin' && (
          <>
            <Route path="/admin" element={<AdminDashboard/>} />
            <Route path="/admin/add-book" element={<AddBook/>} />
            <Route path="/admin/all-orders" element={<AllOrders/>} />
            <Route path="/admin/edit-book/:id" element={<EditBook/>} />
            <Route path="*" element={<AdminDashboard/>} />
            
          </>
        )}

        {/* Protected Routes for users */}
        <Route
          path="/cart"
          element={isLoggedIn ? <Cart /> : <Navigate to="/login" />}
        />
        
        {/* Profile Route - Redirect admins to admin dashboard */}
        <Route
          path="/profile"
          element={isLoggedIn ? (role === 'admin' ? <Navigate to="/admin" /> : <Profile />) : <Navigate to="/login" />}
        >
          <Route index element={<Favoruites />} />
          <Route path="order-history" element={<OrderHistory />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
