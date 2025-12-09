import React, { useState } from "react";
import { Grid3x3, TrendingUp, Wallet } from "lucide-react";
import ProfileHeader from "./profile/ProfileHeader";
import ProfileBanner from "./profile/ProfileBanner";
import ProfileAvatar from "./profile/ProfileAvatar";
import LikeButton from "./profile/LikeButton";
import StatsGrid from "./profile/StatsGrid";
import AboutSection from "./profile/AboutSection";
import SkillsSection from "./profile/SkillsSection";
import TabNavigation from "./profile/TabNavigation";
import PostsList from "./profile/PostsList";
import WalletContent from "./profile/WalletContent";

const Profile = () => {
  const [likes, setLikes] = useState(257);
  const [isLiked, setIsLiked] = useState(false);
  const [bioCollapsed, setBioCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleSettings = () => {
    console.log("Settings clicked");
  };

  const handleEdit = () => {
    console.log("Edit clicked");
  };

  // Stats data
  const stats = [
    { label: "Followers", value: 120, icon: TrendingUp },
    { label: "Following", value: 80, icon: TrendingUp },
    { label: "Posts", value: 45, icon: Grid3x3 },
  ];

  const tabs = [
    { id: "posts", label: "Posts", icon: Grid3x3 },
    { id: "wallet", label: "Wallet", icon: Wallet },
  ];

  const posts = [
    { id: 1, title: "My React Journey", likes: 34, date: "2 days ago" },
    { id: 2, title: "Tips for Web Development", likes: 56, date: "5 days ago" },
    { id: 3, title: "Building My First App", likes: 89, date: "1 week ago" },
  ];

  const transactions = [
    { id: 1, type: "Reward", amount: "+50", reason: "100 Likes Milestone", date: "Oct 5" },
    { id: 2, type: "Reward", amount: "+25", reason: "Event Participation", date: "Oct 1" },
  ];

  const bioText =
    "Hey! I'm Roma, passionate about tech startups, React, and building useful apps. Always looking for new challenges and ideas. I love coding, collaborating on projects, and learning new technologies to improve my skills.";

  const bioPreview =
    "Hey! I'm Roma, passionate about tech startups, React, and building useful apps...";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative max-w-2xl mx-auto bg-white shadow-lg">
        {/* Profile Header */}
        <ProfileHeader onBack={handleBack} onSettings={handleSettings} />

        {/* Like button at top-right corner */}
        <div className="absolute top-20 right-6 z-10">
          <LikeButton likes={likes} isLiked={isLiked} onLike={handleLike} />
        </div>

        {/* Profile Banner with top stats */}
        <ProfileBanner
          name="Roma Singh"
          followers={stats.find(s => s.label === "Followers").value}
          following={stats.find(s => s.label === "Following").value}
          posts={stats.find(s => s.label === "Posts").value}
        />

        <div className="px-6 pb-6">
          <ProfileAvatar
            initials="RS"
            subtitle="Student at XYZ College"
            isPremium={true}
            onEdit={handleEdit}
          />

          {/* Stats Grid (optional, duplicate of top banner stats) */}
          <StatsGrid stats={stats} />

          {/* About Section */}
          <AboutSection
            bio={bioCollapsed ? bioPreview : bioText}
            isCollapsed={bioCollapsed}
            onToggle={() => setBioCollapsed(!bioCollapsed)}
          />

          {/* Skills */}
          <SkillsSection skills={["UI/UX", "Coder", "Marketer"]} />

          {/* Tabs */}
          <div className="mt-8">
            <TabNavigation
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            <div className="mt-6">
              {activeTab === "posts" && <PostsList posts={posts} />}
              {activeTab === "wallet" && (
                <WalletContent balance={75} transactions={transactions} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
