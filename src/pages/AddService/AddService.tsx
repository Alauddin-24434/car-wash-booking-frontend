import { useGetAllServicesQuery } from "../../redux/features/service/serviceApi";


const AddService = () => {
    const { data, error, isLoading } = useGetAllServicesQuery(undefined);
    console.log(data)
    return (
        <div>
            add service
        </div>
    );
};

export default AddService;