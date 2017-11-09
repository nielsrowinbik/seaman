import { h } from 'preact';
import Main from '../../components/Main';
import Container from '../../components/Container';

const Overview = ({ match: { params: { id } } }, { mobxStores: { OrgStore } }) => (
	<Main>
		<Container>
			<h1>Overview</h1>
		</Container>
	</Main>
);

export default Overview;