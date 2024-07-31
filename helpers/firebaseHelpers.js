import { db } from '../firebase/firebaseConfig';

// Utility function to handle errors
const handleFirestoreError = (action) => (error) => {
  console.error(`Error ${action}:`, error);
};

// Task Operations
const tasksCollection = db.collection('tasks');

export const fetchTasks = (selectedDate, userId, setTasks) => {
  return tasksCollection
    .where('date', '==', selectedDate)
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .onSnapshot(
      (snapshot) => {
        const fetchedTasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTasks(fetchedTasks);
      },
      handleFirestoreError('fetching tasks')
    );
};

export const addTask = async (text, selectedDate, userId) => {
  try {
    await tasksCollection.add({
      text,
      date: selectedDate,
      userId,
      completed: false,
      postponed: false,
      canceled: false,
      createdAt: new Date(),
    });
    console.log('Task added successfully');
  } catch (error) {
    handleFirestoreError('adding task')(error);
  }
};

export const updateTask = async (id, updates) => {
  try {
    await tasksCollection.doc(id).update(updates);
    console.log('Task updated successfully');
  } catch (error) {
    handleFirestoreError('updating task')(error);
  }
};

// Task Actions
export const markTaskAsCompleted = async (id) => {
  await updateTask(id, { completed: true });
};

export const toggleTaskCompletion = async (id, completed) => {
  await updateTask(id, { completed: !completed });
};

export const postponeTask = async (id, newDate) => {
  await updateTask(id, { date: newDate, postponed: true });
};

export const cancelTask = async (id) => {
  await updateTask(id, { canceled: true });
};

// Admin Operations
export const updateExistingTasks = async () => {
  try {
    const tasksSnapshot = await tasksCollection.get();
    const batch = db.batch();
    
    tasksSnapshot.forEach((doc) => {
      const taskRef = tasksCollection.doc(doc.id);
      batch.update(taskRef, { postponed: false, canceled: false });
    });
    
    await batch.commit();
    console.log('Existing tasks updated successfully');
  } catch (error) {
    handleFirestoreError('updating existing tasks')(error);
  }
};

