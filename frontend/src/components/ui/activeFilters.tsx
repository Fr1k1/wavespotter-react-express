import { BeachTexture, BeachType } from "@/common/types";
import { useEffect, useState } from "react";
import { getBeachTypes } from "@/api/beachTypes";
import { getBeachTextures } from "@/api/beachTextures";
import { getCharacteristics } from "@/api/characteristics";

interface ActiveFiltersProps {
  filters: {
    waterTypeId?: string;
    beachTextureId?: string;
    characteristicIds?: number[];
  };
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ filters }) => {
  const [beachTypes, setBeachTypes] = useState<BeachType[]>([]);
  const [beachTextures, setBeachTextures] = useState<BeachTexture[]>([]);
  const [characteristics, setCharacteristics] = useState<any[]>([]);

  const hasActiveFilters =
    filters.waterTypeId ||
    filters.beachTextureId ||
    (filters.characteristicIds && filters.characteristicIds.length > 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typesResponse, texturesResponse, characteristicsResponse] =
          await Promise.all([
            getBeachTypes(),
            getBeachTextures(),
            getCharacteristics(),
          ]);
        setBeachTypes(typesResponse);
        setBeachTextures(texturesResponse);
        setCharacteristics(characteristicsResponse);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    if (hasActiveFilters) {
      fetchData();
    }
  }, [hasActiveFilters]);

  if (!hasActiveFilters) return null;

  return (
    <div className="grid grid-cols-3 gap-4 lg:flex">
      {filters.waterTypeId && (
        <div className="bg-secondary rounded-xl text-white px-3 py-1 text-sm">
          <p>
            {
              beachTypes.find(
                (type) => type.id.toString() === filters.waterTypeId
              )?.name
            }
          </p>
        </div>
      )}

      {filters.beachTextureId && (
        <div className="bg-secondary rounded-xl text-white px-3 py-1 text-sm">
          <p>
            {
              beachTextures.find(
                (texture) => texture.id.toString() === filters.beachTextureId
              )?.name
            }
          </p>
        </div>
      )}

      {filters.characteristicIds &&
        filters.characteristicIds.map((charId) => {
          const characteristic = characteristics.find(
            (char) => char.id === charId
          );
          return characteristic ? (
            <div
              key={charId}
              className="bg-secondary rounded-xl text-white px-3 py-1 text-sm"
            >
              <p>{characteristic.name}</p>
            </div>
          ) : null;
        })}
    </div>
  );
};

export default ActiveFilters;
