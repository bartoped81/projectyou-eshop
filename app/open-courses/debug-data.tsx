"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function DebugData() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function loadDebugData() {
      const { data: courses, error } = await supabase
        .from("courses")
        .select(`
          id,
          title,
          slug,
          lecturer_name,
          image_url,
          lecturer_image_url,
          course_dates (
            id,
            start_date,
            end_date
          )
        `)
        .limit(5);

      if (error) {
        console.error("Error:", error);
        setData({ error: error.message });
      } else {
        console.log("Loaded courses:", courses);
        setData(courses);
      }
    }

    loadDebugData();
  }, []);

  if (!data) return <div>Loading debug data...</div>;

  return (
    <div className="fixed bottom-4 right-4 bg-slate-900 text-white p-4 rounded-lg text-xs max-w-md max-h-96 overflow-auto z-50">
      <h3 className="font-bold mb-2">Debug Data:</h3>
      <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
