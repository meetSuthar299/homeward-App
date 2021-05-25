import React from 'react';

import { FirestoreContext } from '../context/FirestoreContext';

export default useFirestore = () => React.useContext(FirestoreContext);
