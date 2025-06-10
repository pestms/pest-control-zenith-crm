
import React from 'react';
import { Home, Bell, Users, FileText, BarChart3, TrendingUp, CheckCircle, Clock, Settings, UserCircle } from 'lucide-react';

export const DashboardPreview = () => {
  return (
    <div className="relative mt-12 max-w-6xl mx-auto">
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700">
        <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
          <div className="flex h-[500px]">
            {/* Enhanced Sidebar */}
            <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">PestGuard Pro</h3>
                  <p className="text-xs text-gray-400">Pest Control CRM</p>
                </div>
              </div>
              <nav className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 bg-green-600/20 border border-green-500/30 rounded-lg text-green-400">
                  <Home className="w-4 h-4" />
                  <span className="text-sm font-medium">Dashboard</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Leads</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">Quotations</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm">Analytics</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white">
                  <UserCircle className="w-4 h-4" />
                  <span className="text-sm">User Management</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">Settings</span>
                </div>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-white text-lg">Welcome Back, John Connor! 👋</h3>
                  <p className="text-gray-400 text-sm">Here's what's happening with your leads today</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium animate-pulse border border-green-500/30">
                    Live Dashboard
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-blue-400">127</div>
                  <div className="text-xs text-blue-300">Total Leads</div>
                  <div className="text-xs text-green-400">+12% this week</div>
                </div>
                <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-green-400">89</div>
                  <div className="text-xs text-green-300">Conversions</div>
                  <div className="text-xs text-green-400">+8% this week</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <FileText className="w-5 h-5 text-orange-400" />
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-orange-400">45</div>
                  <div className="text-xs text-orange-300">Quotes Sent</div>
                  <div className="text-xs text-green-400">+5% this week</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-2xl font-bold text-purple-400">23</div>
                  <div className="text-xs text-purple-300">Pending</div>
                  <div className="text-xs text-yellow-400">Need attention</div>
                </div>
              </div>

              {/* Recent Activity & Enhanced Chart */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    Recent Activity
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 bg-green-500/10 border border-green-500/20 rounded">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm text-green-300">New Lead Assigned</div>
                        <div className="text-xs text-green-200">Residential • Ant Problem</div>
                      </div>
                      <div className="text-xs text-gray-400">2m ago</div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-blue-500/10 border border-blue-500/20 rounded">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm text-blue-300">Quote Approved</div>
                        <div className="text-xs text-blue-200">Commercial • $2,500</div>
                      </div>
                      <div className="text-xs text-gray-400">5m ago</div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-orange-500/10 border border-orange-500/20 rounded">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm text-orange-300">Follow-up Scheduled</div>
                        <div className="text-xs text-orange-200">Tomorrow 2:00 PM</div>
                      </div>
                      <div className="text-xs text-gray-400">12m ago</div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-purple-500/10 border border-purple-500/20 rounded">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm text-purple-300">Service Completed</div>
                        <div className="text-xs text-purple-200">Termite Treatment</div>
                      </div>
                      <div className="text-xs text-gray-400">1h ago</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-gray-400" />
                    Lead Performance
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">This Week</span>
                      <span className="text-sm text-green-400">+15%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full" style={{width: '75%'}}></div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Conversion Rate</span>
                        <span className="text-xs text-green-400">68%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded h-1.5">
                        <div className="bg-green-400 h-1.5 rounded" style={{width: '68%'}}></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Response Time</span>
                        <span className="text-xs text-blue-400">2.3h avg</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded h-1.5">
                        <div className="bg-blue-400 h-1.5 rounded" style={{width: '85%'}}></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Customer Satisfaction</span>
                        <span className="text-xs text-purple-400">4.8/5</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded h-1.5">
                        <div className="bg-purple-400 h-1.5 rounded" style={{width: '96%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Enhanced bottom fade overlay with multiple layers */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent rounded-b-2xl"></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent rounded-b-2xl"></div>
      </div>
    </div>
  );
};
