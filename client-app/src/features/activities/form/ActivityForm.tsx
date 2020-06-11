import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';

interface DetialParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetialParams>> = ({ match, history }) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: intitialFormState,
    loadActivity,
    clearActivity,
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: '',
    title: '',
    catagory: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  });

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(() => intitialFormState && setActivity(intitialFormState));
    }
    return () => {
      clearActivity();
    };
  }, [loadActivity, clearActivity, match.params.id, intitialFormState, activity.id.length]);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
    } else {
      editActivity(activity).then(() => history.push(`/activities/${activity.id}`));
    }
  };

  const handleInputChnage = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Grid>
      <Grid.Column width={10}>
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
            <Button onClick={() => history.push('/activities')} floated="right" type="button" content="Cancle" />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
