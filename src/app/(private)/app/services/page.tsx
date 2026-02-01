import { Plus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { serviceColumns } from "./columns";
import { ServiceDataTable } from "./data-table";

const getServices = async () =>
  await db.service.findMany({
    select: { id: true, name: true, duration: true, required: true },
  });

const Services = async () => {
  const services = await getServices();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base">Services</h3>
        <Button size="lg" className="text-base">
          <HugeiconsIcon icon={Plus} />
          New Service
        </Button>
      </div>
      <div className="container mx-auto py-10">
        <ServiceDataTable columns={serviceColumns} data={services} />
      </div>
    </div>
  );
};

export default Services;
