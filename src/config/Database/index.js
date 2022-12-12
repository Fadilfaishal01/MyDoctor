import {getDatabase} from 'firebase/database';
import FirebaseConfig from '../Firebase';

const Database = getDatabase(FirebaseConfig);

export default Database;
