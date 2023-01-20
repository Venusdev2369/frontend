import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { connect } from 'react-redux';
import { setArray, setNum } from '../../../redux/game-reducer/actions'
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@mui/material';
import Footer from 'src/components/Footer';
import Button from '@mui/material/Button';
import Panel from './Panel';
import Pad from './Pad'
import $ from 'jquery'
const data = [
  { option: '0', style: { backgroundColor: 'green', textColor: 'white' } },
  { option: '32' },
  { option: '15' },
  { option: '19' },
  { option: '4' },
  { option: '21' },
  { option: '2' },
  { option: '25' },
  { option: '17' },
  { option: '34' },
  { option: '6' },
  { option: '27' },
  { option: '13' },
  { option: '36' },
  { option: '11' },
  { option: '30' },
  { option: '8' },
  { option: '23' },
  { option: '10' },
  { option: '5' },
  { option: '24' },
  { option: '16' },
  { option: '33' },
  { option: '1' },
  { option: '20' },
  { option: '14' },
  { option: '31' },
  { option: '9' },
  { option: '22' },
  { option: '18' },
  { option: '29' },
  { option: '7' },
  { option: '28' },
  { option: '12' },
  { option: '35' },
  { option: '3' },
  { option: '26' },
]


const Spin = ({ gameData, ButtonClick, SpinClick }) => {
  const dispatch = useAppDispatch();
  const [prizeNumber, setPrizeNumber] = useState(-1);

  const handleSpinClick = () => {
    $('.ballTrack').removeAttr('style');
    $('.wheel').removeAttr('style');
    const newPrizeNumber = Math.floor(Math.random() * data.length)
    setPrizeNumber(newPrizeNumber)
  }
  return (
    <>
      <Card>
        <CardHeader>

        </CardHeader>
        <Divider />
        <CardContent>
          <h1>Please send me your github account, though so I can invite you. wonderp087@</h1>
          <Container maxWidth="lg">
            <Card>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={3}
              >
                <Pad prizeNumber={prizeNumber} />
                <Panel />
              </Grid>
            </Card>

            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} >
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                  spacing={2}
                >
                  <Grid item xs={12} md={4} sm={12}>
                    <Card>
                      <Button fullWidth variant='contained' color="success" size="large" onClick={handleSpinClick}>Spin Now</Button>
                    </Card>
                  </Grid>
                  <Grid item xs={12}
                    md={8} sm={12}
                  >
                  </Grid>
                </Grid>
              </Grid>

            </Grid>
          </Container>
        </CardContent>
      </Card>
      <Footer />
    </>
  );
}
const mapStateToProps = (state) => ({
  gameData: state.gameReducer
})

const mapDispatchToProps = {
  ButtonClick: setArray,
  SpinClick: setNum
}

export default connect(mapStateToProps, mapDispatchToProps)(Spin);
