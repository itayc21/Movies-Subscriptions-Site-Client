import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginComp from './Components/LoginComp';
import MoviesComp from './Components/MoviesComp';
import AddMovieComp from './Components/AddMovieComp';
import AllMoviesComp from './Components/AllMoviesComp';
import MainPageComp from './Components/MainPageComp';
import SubscriptionsComp from './Components/SubscriptionsComp';
import AllMembersComp from './Components/AllMembersComp';
import AddMemberComp from './Components/AddMemberComp';
import EditMovieComp from './Components/EditMovieComp';
import UsersManagementComp from './Components/UsersManagementComp';
import EditUserComp from './Components/EditUserComp';
import EditMemberComp from './Components/EditMemberComp';
import AllUsersComp from './Components/AllUsersComp';
import AddUserComp from './Components/AddUserComp';
import AddNewMovieComp from './Components/AddNewMovieComp';
import MoviesWatchedComp from './Components/MoviesWatchedComp';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginComp />} />
      <Route path="/main-page" element={<MainPageComp />}>
        <Route path="movies" element={<MoviesComp />}>
          <Route path="all-movies" element={<AllMoviesComp />} />
          <Route path="add-movie" element={<AddMovieComp />} />
          <Route path="edit-movie/:id" element={<EditMovieComp />} />
        </Route>
        <Route path="subscriptions" element={<SubscriptionsComp />}>
          <Route path="all-members" element={<AllMembersComp />} />
          <Route path="add-member" element={<AddMemberComp />} />
          <Route path="edit-member/:_id" element={<EditMemberComp />} />
          <Route path="watched-movies" element={<MoviesWatchedComp />}>
            <Route path="add-new-movie" element={<AddNewMovieComp />} />
          </Route>
        </Route>
        <Route path="users-management" element={<UsersManagementComp />}>
          <Route path="all-users" element={<AllUsersComp />} />
          <Route path="add-user" element={<AddUserComp />} />
          <Route path="edit-user/:id" element={<EditUserComp />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
