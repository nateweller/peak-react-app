import { useDataStoreItem } from '../hooks';
import AppLayout from '../layouts/AppLayout';
import ClimbCard from '../components/ClimbCard';

function LogPage() {
	const { useData: sendData } = useDataStoreItem(`log`);

	const pageHeader = (
		<div className="md:flex md:items-center md:justify-between">
			<div className="min-w-0 flex-1">
				<h1 className="text-3xl font-bold text-white">Log Book</h1>
			</div>
		</div>
	);

	return (
		<AppLayout header={pageHeader} isBorderless={true}>
			{sendData &&
				sendData.map((send, loopIndex) => (
					<ClimbCard data={send.climb} className="mb-4" key={loopIndex} />
				))}
		</AppLayout>
	);
}

export default LogPage;
