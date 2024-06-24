import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Pages/Login';
import Sidebar from './Components/Sidebar/Sidebar';
import { BookingProvider } from './Context/BookingContext';
import { SettingProvider } from './Context/SettingContext';

function App() {
  // <ScheduleComponent
  //   // width={"40%"}
  //   selectedDate={new Date(2023, 1, 15)}
  //   eventSettings={{
  //     dataSource: data,
  //   }}
  // >
  //   <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
  // </ScheduleComponent>
  // );
  return (
    <BookingProvider>
      <SettingProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Sidebar />}>
            {/* <Route path="/Login" element={<Login />} /> */}
              <Route index element={<Sidebar />} />
            </Route>
          </Routes>
          <Toaster />
        </BrowserRouter>
      </SettingProvider>
    </BookingProvider>
  )
}

export default App