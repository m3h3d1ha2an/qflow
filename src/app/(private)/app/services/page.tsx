import { Plus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { serviceColumns } from "./columns";

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
      <div className="container mx-auto">
        <DataTable columns={serviceColumns} data={services} />
      </div>
    </div>
  );
};

export default Services;
