import { useState } from "react";
import { Menu, Search, Download, Calendar, Filter, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for attendance
const attendanceData = {
  field: [
    { id: "F001", name: "Pedro Gonzalez", department: "Field Operations", position: "Field Worker", timeIn: "6:00 AM", timeOut: "4:00 PM", breakDuration: "1h", status: "Present" },
    { id: "F002", name: "Rosa Villareal", department: "Field Operations", position: "Supervisor", timeIn: "5:45 AM", timeOut: "4:30 PM", breakDuration: "1h", status: "Present" },
    { id: "F003", name: "Miguel Torres", department: "Field Operations", position: "Equipment Operator", timeIn: "6:30 AM", timeOut: "-", breakDuration: "-", status: "Late" },
    { id: "F004", name: "Carmen Reyes", department: "Field Operations", position: "Field Worker", timeIn: "-", timeOut: "-", breakDuration: "-", status: "Absent" },
  ],
  packing: [
    { id: "P001", name: "Maria Santos", department: "Packing", position: "Packer", timeIn: "7:30 AM", timeOut: "5:00 PM", breakDuration: "1h", status: "Present" },
    { id: "P002", name: "Juan Dela Cruz", department: "Packing", position: "Team Leader", timeIn: "7:00 AM", timeOut: "5:30 PM", breakDuration: "1h", status: "Present" },
    { id: "P003", name: "Ana Rodriguez", department: "Packing", position: "Quality Control", timeIn: "8:15 AM", timeOut: "-", breakDuration: "-", status: "Late" },
    { id: "P004", name: "Carlos Mendoza", department: "Packing", position: "Packer", timeIn: "-", timeOut: "-", breakDuration: "-", status: "Absent" },
  ],
  office: [
    { id: "O001", name: "Jennifer Lopez", department: "Administration", position: "HR Manager", timeIn: "8:00 AM", timeOut: "5:00 PM", breakDuration: "1h", status: "Present" },
    { id: "O002", name: "Roberto Santos", department: "Finance", position: "Accountant", timeIn: "8:30 AM", timeOut: "5:30 PM", breakDuration: "1h", status: "Present" },
    { id: "O003", name: "Elena Cruz", department: "IT Support", position: "System Admin", timeIn: "9:15 AM", timeOut: "-", breakDuration: "-", status: "Late" },
    { id: "O004", name: "Mark Dela Torre", department: "Administration", position: "Office Assistant", timeIn: "-", timeOut: "-", breakDuration: "-", status: "Absent" },
  ]
};

const AttendancePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [activeTab, setActiveTab] = useState<'field' | 'packing' | 'office'>('field');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Present":
        return <Badge className="bg-primary text-primary-foreground">Present</Badge>;
      case "Late":
        return <Badge className="bg-accent text-accent-foreground">Late</Badge>;
      case "Absent":
        return <Badge variant="destructive">Absent</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filterAttendance = (data: any[]) => {
    return data.filter(emp => 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const AttendanceTable = ({ data }: { data: any[] }) => (
    <Card>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 font-medium">Employee Name</th>
                <th className="text-left p-3 font-medium">Employee ID</th>
                <th className="text-left p-3 font-medium">Department</th>
                <th className="text-left p-3 font-medium">Position</th>
                <th className="text-left p-3 font-medium">Time In</th>
                <th className="text-left p-3 font-medium">Time Out</th>
                <th className="text-left p-3 font-medium">Break Duration</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filterAttendance(data).map((employee) => (
                <tr key={employee.id} className="border-b border-border hover:bg-muted/50">
                  <td className="p-3">{employee.name}</td>
                  <td className="p-3 font-mono">{employee.id}</td>
                  <td className="p-3">{employee.department}</td>
                  <td className="p-3">{employee.position}</td>
                  <td className="p-3">{employee.timeIn}</td>
                  <td className="p-3">{employee.timeOut}</td>
                  <td className="p-3">{employee.breakDuration}</td>
                  <td className="p-3">{getStatusBadge(employee.status)}</td>
                  <td className="p-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedEmployee(employee)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Profile
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-card shadow-lg transform transition-transform duration-300 z-50 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:shadow-none`}>
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-primary">CFARBEMPCO</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          <Button variant="default" className="w-full justify-start">
            Attendance
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Leave Management
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Employee Evaluation
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Reports
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-card shadow-sm border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-primary">Attendance Overview</h1>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <Input
                    type="date"
                    placeholder="From date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <Input
                    type="date"
                    placeholder="To date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Generate Report" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">
                        <div className="flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Export as PDF
                        </div>
                      </SelectItem>
                      <SelectItem value="excel">
                        <div className="flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Export as Excel
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Horizontal Tabs */}
          <div className="mb-6">
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('field')}
                className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'field'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }`}
              >
                Field Area Employee
              </button>
              <button
                onClick={() => setActiveTab('packing')}
                className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'packing'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }`}
              >
                Packing Area Employee
              </button>
              <button
                onClick={() => setActiveTab('office')}
                className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'office'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }`}
              >
                Office Staff
              </button>
            </div>
          </div>

          {/* Attendance Table */}
          <AttendanceTable data={attendanceData[activeTab]} />
        </main>
      </div>

      {/* Employee Profile Modal */}
      <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Employee Profile</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="font-semibold">{selectedEmployee.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Employee ID</label>
                  <p className="font-mono">{selectedEmployee.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Department</label>
                  <p>{selectedEmployee.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Position</label>
                  <p>{selectedEmployee.position}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Time In</label>
                  <p>{selectedEmployee.timeIn}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Time Out</label>
                  <p>{selectedEmployee.timeOut}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Break Duration</label>
                  <p>{selectedEmployee.breakDuration}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedEmployee.status)}</div>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold mb-2">Contact Information</h4>
                <p className="text-sm text-muted-foreground">Email: {selectedEmployee.name.toLowerCase().replace(' ', '.')}@cfarbempco.com</p>
                <p className="text-sm text-muted-foreground">Phone: +63 912 345 6789</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AttendancePage;