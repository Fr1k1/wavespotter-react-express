import { MapPin, User } from "@phosphor-icons/react";
import { Button } from "./button";
import { Card, CardHeader, CardTitle } from "./card";

const BeachRequestsCard = () => {
  return (
    <Card>
      <div>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <div>
                <CardTitle>Beach Zlatni Rat</CardTitle>
                <div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={24} weight="fill" color="#0E7490" />
                    <p>Brač, Croatia</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <User size={24} weight="fill" color="#0E7490" />
                    <p>Marko Markec</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Button underlined variant={"darker"}>
                View request
              </Button>
            </div>
          </div>
        </CardHeader>
      </div>
    </Card>
  );
};

export default BeachRequestsCard;
