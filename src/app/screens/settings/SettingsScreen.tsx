import { useState } from "react";
import { motion } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { GeneralSettings } from "./GeneralSettings";
import { AdvancedSettings } from "./AdvancedSettings";
import { SupportSettings } from "./SupportSettings";
import { AnimatedBackground } from "../../components/AnimatedBackground";

export function SettingsScreen() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <AnimatedBackground variant="default" />
      
      <div className="relative z-10 flex flex-col h-full px-6 py-8 pb-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl text-[#0F172A] mb-1">Settings</h1>
        <p className="text-sm text-[#64748B]">Customize your VPN experience</p>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
        <TabsList className="grid w-full grid-cols-3 mb-4 bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-xl p-1 shadow-lg flex-shrink-0">
          <TabsTrigger
            value="general"
            className="rounded-lg data-[state=active]:bg-[#22C55E] data-[state=active]:text-white"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            className="rounded-lg data-[state=active]:bg-[#22C55E] data-[state=active]:text-white"
          >
            Advanced
          </TabsTrigger>
          <TabsTrigger
            value="support"
            className="rounded-lg data-[state=active]:bg-[#22C55E] data-[state=active]:text-white"
          >
            Support
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 min-h-0 overflow-y-auto pb-4">
          <TabsContent value="general" className="h-full">
            <GeneralSettings />
          </TabsContent>

          <TabsContent value="advanced" className="h-full">
            <AdvancedSettings />
          </TabsContent>

          <TabsContent value="support" className="h-full">
            <SupportSettings />
          </TabsContent>
        </div>
      </Tabs>
      </div>
    </div>
  );
}