import React, { useState, FormEvent, useContext } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';

interface IProps {
  activity: IActivity;
}

const ActivityForm: React.FC<IProps> = ({ activity: intitialFormState }) => {
  const activityStore = useContext(ActivityStore);
  const { createActivity, editActivity, submitting, cancleFormOpen } = activityStore;
  const intitializeFrom = () => {
    if (intitialFormState) {
      return intitialFormState;
    } else {
      return {
        id: '',
        title: '',
        catagory: '',
        description: '',
        date: '',
        city: '',
        venue: '',
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(intitializeFrom);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  const handleInputChnage = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Title" onChange={handleInputChnage} name="title" value={activity.title} />
        <Form.TextArea
          onChange={handleInputChnage}
          name="description"
          rows={2}
          placeholder="Description"
          value={activity.description}
        />
        <Form.Input onChange={handleInputChnage} name="catagory" placeholder="Category" value={activity.catagory} />
        <Form.Input
          onChange={handleInputChnage}
          name="date"
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
        />
        <Form.Input onChange={handleInputChnage} name="city" placeholder="City" value={activity.city} />
        <Form.Input onChange={handleInputChnage} name="venue" placeholder="Venue" value={activity.venue} />
        <Button
          loading={submitting}
          onClick={() => handleSubmit()}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button onClick={cancleFormOpen} floated="right" type="button" content="Cancle" />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
