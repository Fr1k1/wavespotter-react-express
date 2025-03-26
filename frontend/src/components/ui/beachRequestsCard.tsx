import { MapPin, User } from "@phosphor-icons/react";
import { Button } from "./button";
import { Card, CardHeader, CardTitle } from "./card";
import { useNavigate } from "react-router";

const BeachRequestsCard = ({ request }) => {
  const navigate = useNavigate();

  const id = request.id;
  return (
    <Card>
      <div>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <div>
                <CardTitle>{request?.name}</CardTitle>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={24} weight="fill" color="#0E7490" />
                    <p>
                      {request.city.name}, {request.city.country?.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <User size={24} weight="fill" color="#0E7490" />
                    <p>
                      {request.user.first_name} {request.user.last_name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Button
                underlined
                variant={"darker"}
                onClick={() => {
                  navigate("/beach-requests/" + id);
                }}
              >
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
