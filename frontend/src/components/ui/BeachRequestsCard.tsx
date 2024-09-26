import { Button } from "./button";
import { Card, CardHeader, CardTitle } from "./card";

const BeachRequestsCard = () => {
  return (
    <Card>
      <div className="">
        <CardHeader className="">
          <div className="flex justify-between items-center">
            <div className="">
              <div className="">
                <CardTitle>Beach Zlatni Rat</CardTitle>
                <div className="">
                  <div>
                    <p>Brač, Croatia</p>
                  </div>
                  <div>
                    <p>Marko Markec</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
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
