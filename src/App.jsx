import React from "react";
import Header from "./components/Header";
import SOSButton from "./components/SOSButton";
import NetworkingHub from "./components/NetworkingHub";
import MentorList from "./components/MentorList";
import MapStub from "./components/MapStub";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Header />
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <SOSButton />
          <NetworkingHub />
          <MentorList />
        </div>
        <aside>
          <MapStub />
        </aside>
      </div>

      <ToastContainer />
    </div>
  );
}
