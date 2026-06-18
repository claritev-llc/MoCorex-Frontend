import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { authAPI } from "@/services/api";
import { User, Lock, Bell, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Settings = () => {
  const { user } = useAuth();
  // Profile settings
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Security settings
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [tradingAlerts, setTradingAlerts] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [newsAlerts, setNewsAlerts] = useState(false);

  // Security features
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [biometricAuth, setBiometricAuth] = useState(false);

  const handleProfileUpdate = async () => {
    toast.success("Profile updated successfully!");
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      await authAPI.changePassword({
        oldPassword: currentPassword,
        newPassword: newPassword,
      });
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to change password");
    }
  };

  const handleNotificationUpdate = () => {
    toast.success("Notification preferences updated!");
  };

  return (
    <MainLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            {user?.isDemo && (
              <Badge className="bg-blue-500/10 text-blue-400/80 border-blue-500/20">
                Demo Mode
              </Badge>
            )}
          </div>
          <p className="text-slate-400">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="bg-transparent border-b border-slate-700/50">
            <TabsTrigger value="profile" className="data-[state=active]:bg-slate-800/30 data-[state=active]:text-white text-slate-400">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-slate-800/30 data-[state=active]:text-white text-slate-400">
              <Lock className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-slate-800/30 data-[state=active]:text-white text-slate-400">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-slate-800/30 data-[state=active]:text-white text-slate-400">
              <Shield className="w-4 h-4 mr-2" />
              Privacy
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <Card className="bg-transparent border-slate-800/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Profile Information</CardTitle>
                <CardDescription className="text-slate-400">
                  Update your account profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-300">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="bg-transparent border-slate-700/50 text-white focus:border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="bg-transparent border-slate-700/50 text-white focus:border-slate-600"
                  />
                </div>
                <Button
                  onClick={handleProfileUpdate}
                  className="bg-slate-700/80 hover:bg-slate-700 text-white font-semibold border border-slate-600/50"
                >
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="mt-6 space-y-6">
            <Card className="bg-transparent border-slate-800/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Change Password</CardTitle>
                <CardDescription className="text-slate-400">
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password" className="text-slate-300">
                    Current Password
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-transparent border-slate-700/50 text-white focus:border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-slate-300">
                    New Password
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-transparent border-slate-700/50 text-white focus:border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-slate-300">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-transparent border-slate-700/50 text-white focus:border-slate-600"
                  />
                </div>
                <Button
                  onClick={handlePasswordChange}
                  className="bg-slate-700/80 hover:bg-slate-700 text-white font-semibold border border-slate-600/50"
                >
                  Update Password
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-transparent border-slate-800/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Two-Factor Authentication</CardTitle>
                <CardDescription className="text-slate-400">
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Two-Factor Authentication</p>
                    <p className="text-slate-400 text-sm">
                      Require a code in addition to your password
                    </p>
                  </div>
                  <Switch
                    checked={twoFactorAuth}
                    onCheckedChange={setTwoFactorAuth}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Biometric Authentication</p>
                    <p className="text-slate-400 text-sm">Use fingerprint or face recognition</p>
                  </div>
                  <Switch
                    checked={biometricAuth}
                    onCheckedChange={setBiometricAuth}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-6">
            <Card className="bg-transparent border-slate-800/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Notification Preferences</CardTitle>
                <CardDescription className="text-slate-400">
                  Manage how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Email Notifications</p>
                    <p className="text-slate-400 text-sm">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Trading Alerts</p>
                    <p className="text-slate-400 text-sm">
                      Get notified when your orders are filled
                    </p>
                  </div>
                  <Switch checked={tradingAlerts} onCheckedChange={setTradingAlerts} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Price Alerts</p>
                    <p className="text-slate-400 text-sm">
                      Alerts when prices reach your target
                    </p>
                  </div>
                  <Switch checked={priceAlerts} onCheckedChange={setPriceAlerts} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">News & Updates</p>
                    <p className="text-slate-400 text-sm">
                      Latest news and platform updates
                    </p>
                  </div>
                  <Switch checked={newsAlerts} onCheckedChange={setNewsAlerts} />
                </div>
                <Button
                  onClick={handleNotificationUpdate}
                  className="bg-slate-700/80 hover:bg-slate-700 text-white font-semibold border border-slate-600/50"
                >
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="mt-6">
            <Card className="bg-transparent border-slate-800/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Privacy Settings</CardTitle>
                <CardDescription className="text-slate-400">
                  Control your privacy and data preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Profile Visibility</p>
                    <p className="text-slate-400 text-sm">Make your profile visible to others</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Activity Status</p>
                    <p className="text-slate-400 text-sm">Show when you're active</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Data Sharing</p>
                    <p className="text-slate-400 text-sm">
                      Share analytics data to improve service
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="pt-4 border-t border-slate-800/30">
                  <Button variant="destructive" className="bg-red-600/80 hover:bg-red-600 border border-red-500/30">
                    Delete Account
                  </Button>
                  <p className="text-slate-500 text-sm mt-2">
                    Once you delete your account, there is no going back
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;

