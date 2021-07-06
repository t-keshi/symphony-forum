import firebase from 'firebase';
import { ConcertResponse } from '../../../types';

export const fetchConcert = async (
  concertId: string,
): Promise<ConcertResponse> => {
  const db = firebase.firestore();
  const concertsRef = db.collection(
    'concert',
  ) as firebase.firestore.CollectionReference<ConcertResponse>;
  const concertRef = concertsRef.doc(concertId);
  const documentSnapshot = await concertRef.get();
  const { id } = documentSnapshot;
  const data = documentSnapshot.data();

  if (!data) {
    throw Error('data is undefined');
  }

  const concert = {
    id,
    title: data.title,
    programs: data.programs,
    address: data.address,
    placeId: data.placeId,
    prefecture: data.prefecture,
    date: (data.date as unknown as firebase.firestore.Timestamp).toDate(),
    symphonies: data.symphonies,
    openAt: (data.openAt as unknown as firebase.firestore.Timestamp).toDate(),
    startAt: (data.startAt as unknown as firebase.firestore.Timestamp).toDate(),
    closeAt: (data.closeAt as unknown as firebase.firestore.Timestamp).toDate(),
    likes: data.likes,
    likesCount: data.likesCount,
    orchestra: data.orchestra,
  };

  return concert;
};