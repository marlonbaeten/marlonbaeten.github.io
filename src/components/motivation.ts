import { Howl } from 'howler';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export enum Sound {
  aiaia = 'aiaia',
  benga = 'benga',
  compliment = 'compliment',
  fat_lady = 'fat_lady',
  goed_bezig = 'goed_bezig',
  heftig = 'heftig',
  helft = 'helft',
  ik_ga_hard = 'ik_ga_hard',
  karamba = 'karamba',
  kut_training = 'kut_training',
  nog_even = 'nog_even',
  onderbroek = 'onderbroek',
  rust = 'rust',
  yeah = 'yeah',
}

export enum SoundType {
  motivation,
  weird,
}

export class Motivation {

  private howl: Howl|null = null;

  private static soundsTypes: {[key in SoundType]: Sound[]} = {
    [SoundType.motivation]: [
      Sound.aiaia,
      Sound.benga,
      Sound.heftig,
      Sound.ik_ga_hard,
      Sound.yeah,
      Sound.compliment,
      Sound.goed_bezig,
    ],
    [SoundType.weird]:  [
      Sound.fat_lady,
      Sound.kut_training,
      Sound.onderbroek,
    ],
  };

  private currentRandom: {[key in SoundType]: Sound[]} = {
    [SoundType.motivation]: [],
    [SoundType.weird]: [],
  };

  load() {
    if (this.howl === null) {
      this.howl = new Howl({
        src: [
          // @ts-ignore
          require('../audio/motivation.ogg'),
          // @ts-ignore
          require('../audio/motivation.m4a'),
          // @ts-ignore
          require('../audio/motivation.mp3'),
          // @ts-ignore
          require('../audio/motivation.ac3'),
        ],
        volume: 0.7,
        sprite: {
          [Sound.aiaia]: [
            0,
            2055.9410430839002
          ],
          [Sound.benga]: [
            4000,
            1036.5986394557822
          ],
          [Sound.compliment]: [
            7000,
            2845.7142857142853
          ],
          [Sound.fat_lady]: [
            11000,
            3041.496598639455
          ],
          [Sound.goed_bezig]: [
            16000,
            1119.2517006802732
          ],
          [Sound.heftig]: [
            19000,
            3153.9002267573687
          ],
          [Sound.helft]: [
            24000,
            3327.414965986396
          ],
          [Sound.ik_ga_hard]: [
            29000,
            2061.587301587302
          ],
          [Sound.karamba]: [
            33000,
            4672.018140589572
          ],
          [Sound.kut_training]: [
            39000,
            2109.07029478458
          ],
          [Sound.nog_even]: [
            43000,
            3995.8503401360517
          ],
          [Sound.onderbroek]: [
            48000,
            1258.6167800453509
          ],
          [Sound.rust]: [
            51000,
            4992.018140589572
          ],
          [Sound.yeah]: [
            57000,
            2120.9070294784597
          ]
        },
      });
    }
  }

  playing() {
    this.load();
    return this.howl.playing();
  }

  play(name: Sound) {
    this.load();
    return this.howl.play(name);
  }

  playRandom(type: SoundType) {
    if (this.currentRandom[type].length === 0) {
      this.currentRandom[type] = Motivation.soundsTypes[type].slice();
    }

    shuffleArray(this.currentRandom[type]);
    const name: Sound = this.currentRandom[type].pop();
    this.play(name);
  }
}

export const motivation = new Motivation();
