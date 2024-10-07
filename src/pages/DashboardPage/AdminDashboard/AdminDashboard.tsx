import CardDataStats from "../../../components/Dashboard/AdminDashboard/Tables/CardDataStats";
import TableOne from "../../../components/Dashboard/AdminDashboard/Tables/TableOne";

const AdminDashboard = () => {
  return (
    <div className="">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Total Users"
          total="980"
          textColor="text-blue-700"
          bgColor="bg-blue-100"
        ></CardDataStats>
        <CardDataStats
          title="Total Services"
          total="25"
          textColor="text-blue-700"
          bgColor="bg-blue-100"
        ></CardDataStats>
        <CardDataStats
          title="Monthly Slot Booked"
          total="89"
          textColor="text-blue-700"
          bgColor="bg-blue-100"
        ></CardDataStats>

        <CardDataStats
          title="Monthly Earn"
          total="$3.456K"
          textColor="text-blue-700"
          bgColor="bg-blue-100"
        ></CardDataStats>
      </div>

      <div>
        <TableOne/>
      </div>
    </div>
  );
};

export default AdminDashboard;
