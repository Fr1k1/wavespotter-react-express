import db from "../models/index.js";

class BeachService {
  async addBeach(beachData) {
    console.log("Beach Data:", beachData);
    const transaction = await db.sequelize.transaction();
    try {
      const newBeach = await db.models.Beach.create(beachData, { transaction });

      const allCharacteristics = [
        ...beachData.characteristics.map((charId) => ({
          beach_id: newBeach.id,
          characteristic_id: parseInt(charId, 10),
          featured: false,
        })),
        ...beachData.featured_items.map((charId) => ({
          beach_id: newBeach.id,
          characteristic_id: parseInt(charId, 10),
          featured: true,
        })),
      ];

      console.log("All Characteristic Entries:", allCharacteristics);
      for (const entry of allCharacteristics) {
        try {
          await db.sequelize.query(
            "INSERT INTO beach_has_characteristics (featured, characteristic_id, beach_id) VALUES (:featured, :characteristic_id, :beach_id)",
            {
              replacements: {
                featured: entry.featured,
                characteristic_id: entry.characteristic_id,
                beach_id: entry.beach_id,
              },
              type: db.sequelize.QueryTypes.INSERT,
              transaction,
            }
          );
        } catch (error) {
          console.error(
            `Error inserting entry: ${JSON.stringify(entry)}`,
            error
          );
          throw error;
        }
      }

      await transaction.commit();
      return newBeach;
    } catch (error) {
      await transaction.rollback();
      console.error("Error in addBeach service:", error);
      throw error;
    }
  }
}

export default new BeachService();
