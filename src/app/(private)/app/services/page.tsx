import { Plus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";

const Services = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base">Services</h3>
        <Button size="lg" className="text-base">
          <HugeiconsIcon icon={Plus} />
          New Service
        </Button>
      </div>
    </div>
  );
};

export default Services;
