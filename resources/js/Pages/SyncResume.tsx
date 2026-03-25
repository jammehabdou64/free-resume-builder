import { ResumeProvider, useResume } from "@/lib/resume-context";
import { router } from "@inertiajs/react";
import { Check, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const SyncResumeComponent = () => {
  const { data, saveNow } = useResume();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const saveResume = async () => {
      try {
        setLoading(true);
        // const result = await saveNow();
        // console.log(result);
        if (false) {
          //   router.visit("/resume");
          console.log("Saved");
          console.log({ data });
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    setTimeout(() => {
      saveResume();
    }, 60000);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen relative">
      {loading && <Loader2 className="w-25 h-25 animate-spin" />}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {loading ? (
          "Saving..."
        ) : (
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Saved</span>
          </div>
        )}
      </div>
    </div>
  );
};

function SyncResume() {
  return (
    <ResumeProvider>
      <SyncResumeComponent />
    </ResumeProvider>
  );
}

export default SyncResume;
