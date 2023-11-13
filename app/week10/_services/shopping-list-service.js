import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, deleteDoc , doc} from "firebase/firestore";

export const getItems = async (userId) => {
  const items = [];

  try {
    const userItemsRef = collection(db, "users", userId, "items");

    const querySnapshot = await getDocs(userItemsRef);

    querySnapshot.forEach((doc) => {
      items.push({
        id: doc.id,
        data: doc.data(),
        name: doc.data().name,
        quantity: doc.data().quantity,
        category: doc.data().category,
      });
    });
  } catch (error) {
    console.error("Error getting items:", error);
    throw error;
  }

  return items;
};

export const addItem = async (userId, item) => {
  try {
    const userItemsRef = collection(db, "users", userId, "items");

    const newItemRef = await addDoc(userItemsRef, item);

    return newItemRef.id;
  } catch (error) {
    console.error("Error adding item:", error);
  }
};

export const deleteItem = async (userId, itemId) => {
  try {
    const userItemsRef = collection(db, "users", userId, "items");

    // Create a reference to the specific document using doc
    const itemDocRef = doc(userItemsRef, itemId);

    // Delete the document
    await deleteDoc(itemDocRef);

    console.log("Item deleted successfully");
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}




