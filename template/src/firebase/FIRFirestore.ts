import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export async function fetchDocuments<T>(
  collectionPath: string,
  whereConditions: Array<[string, FirebaseFirestoreTypes.WhereFilterOp, any]>,
  limit?: number,
): Promise<T[]> {
  try {
    let query: FirebaseFirestoreTypes.Query =
      firestore().collection(collectionPath);

    // Apply dynamic where conditions
    whereConditions.forEach(([field, op, value]) => {
      query = query.where(field, op, value);
    });

    // Apply limit if provided
    if (limit) {
      query = query.limit(limit);
    }

    const querySnapshot = await query.get();

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
}

export async function fetchDocument<T>(
  collectionPath: string,
  whereConditions: Array<[string, FirebaseFirestoreTypes.WhereFilterOp, any]>,
  limit?: number,
): Promise<T | null> {
  try {
    let query: FirebaseFirestoreTypes.Query =
      firestore().collection(collectionPath);

    // Apply dynamic where conditions
    whereConditions.forEach(([field, op, value]) => {
      query = query.where(field, op, value);
    });

    // Apply limit if provided
    if (limit) {
      query = query.limit(limit);
    }

    const querySnapshot = await query.get();

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as T;
  } catch (error) {
    console.error('Error fetching documents:', error);
    return null;
  }
}

export function listenToDocuments<T>(
  collectionPath: string,
  whereConditions: Array<[string, FirebaseFirestoreTypes.WhereFilterOp, any]>,
  limit: number | undefined,
  callback: (documents: T[]) => void,
): () => void {
  let query: FirebaseFirestoreTypes.Query =
    firestore().collection(collectionPath);

  // Apply dynamic where conditions
  whereConditions.forEach(([field, op, value]) => {
    query = query.where(field, op, value);
  });

  // Apply limit if provided
  if (limit) {
    query = query.limit(limit);
  }

  const unsubscribe = query.onSnapshot(snapshot => {
    const documents = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];

    callback(documents);
  });

  return unsubscribe; // Call this function to stop listening
}

export function listenToDocument<T>(
  collectionPath: string,
  whereConditions: Array<[string, FirebaseFirestoreTypes.WhereFilterOp, any]>,
  limit: number | undefined,
  callback: (documents: T) => void,
): () => void {
  let query: FirebaseFirestoreTypes.Query =
    firestore().collection(collectionPath);

  // Apply dynamic where conditions
  whereConditions.forEach(([field, op, value]) => {
    query = query.where(field, op, value);
  });

  // Apply limit if provided
  if (limit) {
    query = query.limit(limit);
  }

  const unsubscribe = query.onSnapshot(snapshot => {
    const documents = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as T;

    callback(documents);
  });

  return unsubscribe; // Call this function to stop listening
}
