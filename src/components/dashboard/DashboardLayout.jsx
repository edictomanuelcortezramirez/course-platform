import { useState } from "react";
import SidebarLayout from "./SidebarLayout";
import CreateCourse from "../../../pages/views/CreateCourse";
import Metrics from "../../../pages/views/Metrics";
import Settings from "../../../pages/views/Settings";
import EvaluationsPanel from "../../../pages/views/EvaluationsPanel";
import MyCourses from "@/pages/views/MyCourses";
import Certificates from "@/pages/views/Certificates";
import Messages from "@/pages/views/Messages";
import Support from "@/pages/views/Support";
import TutorCourses from "@/pages/views/TutorCourses";
import MyStudents from "@/pages/views/MyStudents";


export default function DashboardLayout({ user }) {
  const [view, setView] = useState("metrics");

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarLayout setView={setView} role={user.role} />
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* estudiante */}
        {view === "my-courses" && <MyCourses />}
        {view === "certificates" && <Certificates />}
        {view === "messages" && <Messages />}
        {view === "support" && <Support />}
        
        {/* tutor */}
        {view === "dashboard" && <TutorDashboard />}
        {view === "tutorcourses" && <TutorCourses />}
        {view === "createcourse" && <CreateCourse />}
        {view === "mystudents" && <MyStudents />}
        {view === "settings" && <Settings />}

        {/* administrador */}
        {view === "dashboard" && <AdminDashboard />}
        {view === "userManagement" && <UserManagement />}
        {view === "courseManagement" && <CourseManagement />}
        {view === "reportsAndMetrics" && <ReportsAndMetrics />}
        {view === "systemSettings" && <SystemSettings />}
        {view === "supportRequests" && <SupportRequests />}
        {view === "rolePermissions" && <RolePermissions />}
        
      </main>
    </div>
  );
}
