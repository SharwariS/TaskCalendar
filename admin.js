const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

const updateExistingTasks = async () => {
  try {
    const tasksSnapshot = await db.collection('tasks').get();
    const batch = db.batch();
    
    tasksSnapshot.forEach(doc => {
      const taskRef = db.collection('tasks').doc(doc.id);
      batch.update(taskRef, {
        postponed: false,
        canceled: false
      });
    });
    
    await batch.commit();
    console.log('Existing tasks updated successfully');
  } catch (error) {
    console.error('Error updating existing tasks:', error);
  }
};

updateExistingTasks();
