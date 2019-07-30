const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');

var topTypes = ['NoHair', 'Eyepatch', 'Hat', 'Hijab', 'Turban', 'WinterHat1', 'WinterHat2', 'WinterHat3', 'WinterHat4', 'LongHairBigHair', 'LongHairBob', 'LongHairBun', 'LongHairCurly', 'LongHairCurvy', 'LongHairDreads', 'LongHairFrida', 'LongHairFro', 'LongHairFroBand', 'LongHairNotTooLong', 'LongHairShavedSides', 'LongHairMiaWallace', 'LongHairStraight', 'LongHairStraight2', 'LongHairStraightStrand', 'ShortHairDreads01', 'ShortHairDreads02', 'ShortHairFrizzle', 'ShortHairShaggyMullet', 'ShortHairShortCurly', 'ShortHairShortFlat', 'ShortHairShortRound', 'ShortHairShortWaved', 'ShortHairSides', 'ShortHairTheCaesar', 'ShortHairTheCaesarSidePart'];
var accessoriesTypes = ['Blank', 'Kurt', 'Prescription01', 'Prescription02', 'Round', 'Sunglasses', 'Wayfarers'];
var hairColors = ['Auburn', 'Black', 'Blonde', 'BlondeGolden', 'Brown', 'BrownDark', 'PastelPink', 'Platinum', 'Red', 'SilverGray'];
var facialHairTypes = ['Blank', 'BeardMedium', 'BeardLight', 'BeardMagestic', 'MoustacheFancy', 'MoustacheMagnum'];
var facialHairColors = ['Auburn', 'Black', 'Blonde', 'BlondeGolden', 'Brown', 'BrownDark', 'Platinum', 'Red'];
var clotheTypes = ['BlazerShirt', 'BlazerSweater', 'CollarSweater', 'GraphicShirt', 'Hoodie', 'Overall', 'ShirtCrewNeck', 'ShirtScoopNeck', 'ShirtVNeck'];
var clotheColors = ['Black', 'Blue01', 'Blue02', 'Blue03', 'Gray01', 'Gray02', 'Heather', 'PastelBlue', 'PastelGreen', 'PastelOrange', 'PastelRed', 'PastelYellow', 'Pink', 'Red', 'White'];
var eyeTypes = ['Close', 'Cry', 'Default', 'Dizzy', 'EyeRoll', 'Happy', 'Hearts', 'Side', 'Squint', 'Surprised', 'Wink', 'WinkWacky'];
var eyebrowTypes = ['Angry', 'AngryNatural', 'Default', 'DefaultNatural', 'FlatNatural', 'RaisedExcited', 'RaisedExcitedNatural', 'SadConcerned', 'SadConcernedNatural', 'UnibrowNatural', 'UpDown', 'UpDownNatural'];
var mouthTypes = ['Concerned', 'Default', 'Disbelief', 'Eating', 'Grimace', 'Sad', 'ScreamOpen', 'Serious', 'Smile', 'Tongue', 'Twinkle', 'Vomit'];
var skinColors = ['Tanned', 'Yellow', 'Pale', 'Light', 'Brown', 'DarkBrown', 'Black'];
var count = 0;
var total = topTypes.length * accessoriesTypes.length * hairColors.length * facialHairTypes.length * facialHairColors.length * clotheTypes.length * clotheColors.length * eyeTypes.length * eyebrowTypes.length * mouthTypes.length * skinColors.length;

async function getImage(topType, accessoriesType, hairColor, facialHairColor, facialHairType, clotheType, clotheColor, eyeType, eyebrowType, mouthType, skinColor) {
  try {
    var fileName = `./avatar/t${count}.png`;
    var dFileName = `./avatar/${count}.png`;
    if (fs.existsSync(dFileName)) {
      return;
    }
    const response = await axios.get('http://localhost:3006/png/300', {
      params: {
        'topType': topType,
        'accessoriesType': accessoriesType,
        'hairColor': hairColor,
        'facialHairColor': facialHairColor,
        'facialHairType': facialHairType,
        'clotheType': clotheType,
        'clotheColor': clotheColor,
        'eyeType': eyeType,
        'eyebrowType': eyebrowType,
        'mouthType': mouthType,
        'skinColor': skinColor,
        'avatarStyle': 'Transparent'
      },
      timeout: 2000,
      responseType: 'stream'
    });
    var stream = fs.createWriteStream(fileName);
    response.data.pipe(stream);
    stream.on('finish', function () {
      sharp(fileName).flatten({ background: { r: 255, g: 255, b: 255 } }).jpeg({ quality: 80 }).toFile(dFileName);
      setTimeout(function () {
        fs.unlink(fileName);
      }, 1000);
    });

    console.log(`${count}/${total} ${((count / total) * 100).toFixed(3)}`);
  } catch (error) {
    console.error(error);
    console.log('####### ' + count);
  }
}

async function fetchAll() {
  for (var i1 = 0; i1 < topTypes.length; i1 += 1) {
    for (var i2 = 0; i2 < accessoriesTypes.length; i2 += 1) {
      for (var i3 = 0; i3 < hairColors.length; i3 += 1) {
        for (var i4 = 0; i4 < facialHairTypes.length; i4 += 1) {
          for (var i5 = 0; i5 < facialHairColors.length; i5 += 1) {
            for (var i6 = 0; i6 < clotheTypes.length; i6 += 1) {
              for (var i7 = 0; i7 < clotheColors.length; i7 += 1) {
                for (var i8 = 0; i8 < eyeTypes.length; i8 += 1) {
                  for (var i9 = 0; i9 < eyebrowTypes.length; i9 += 1) {
                    for (var i10 = 0; i10 < mouthTypes.length; i10 += 1) {
                      for (var i11 = 0; i11 < skinColors.length; i11 += 1) {
                        await getImage(topTypes[i1], accessoriesTypes[i2], hairColors[i3], facialHairColors[i5], facialHairTypes[i4], clotheTypes[i6], clotheColors[i7], eyeTypes[i8], eyebrowTypes[i9], mouthTypes[i10], skinColors[i11]);
                        count += 1;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

async function fetchRandom() {
  var _ = function (items) {
    return items[Math.floor(Math.random() * items.length)];
  };

  for (var i = 0; i < 111111; i += 1) {
    await getImage(_(topTypes), _(accessoriesTypes), _(hairColors), _(facialHairColors), _(facialHairTypes), _(clotheTypes), _(clotheColors), _(eyeTypes), _(eyebrowTypes), _(mouthTypes), _(skinColors));
    count += 1;
  }
}

fetchRandom();
