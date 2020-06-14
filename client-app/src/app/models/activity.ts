export interface IActivity {
  id: string;
  title: string;
  description: string;
  catagory: string;
  date: Date;
  city: string;
  venue: string;
}

export interface IActivityFormValues extends Partial<IActivity> {
  time?: Date;
}

export class ActivityFormValues implements IActivityFormValues {
  id?: string = undefined;
  title: string = '';
  catagory: string = '';
  description: string = '';
  time?: Date = undefined;
  date?: Date = undefined;
  city: string = '';
  venue: string = '';

  constructor(init?: IActivityFormValues) {
    if (init && init.date) init.time = init.date;

    Object.assign(this, init);
  }
}
