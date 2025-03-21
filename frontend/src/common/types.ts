export interface User {
  id: number;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface BeachData {
  name: string;
  address: string;
  beachTypeId: string;
  beachDepthId: string;
  beach_country: string;
  beachTextureId: string;
  cityId: string;
  beach_working_hours: string;
  description: string;
  best_time_to_visit?: string;
  local_wildlife?: string;
  restaurants_and_bars_nearby?: string;
  characteristics?: Array<number>;
  featured_items: Array<string>;
  approved?: boolean;
  userId: string;
  images?: Array<string>;
}

export interface Image {
  path: string;
}
