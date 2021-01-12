const dateLaunch = {
  OCT31_TO_NOV21_2020: 'OCT31_TO_NOV21_2020',
  MAR13_TO_APR3_2021: 'MAR13_TO_APR3_2021',
  SEP17_TO_OCT9_2021: 'SEP17_TO_OCT9_2021',
  NONE_OF_THE_ABOVE: 'NONE_OF_THE_ABOVE',
}

const readable = {
  OCT31_TO_NOV21_2020: 'Oct 31 to Nov 21, 2020',
  MAR13_TO_APR3_2021: 'Mar 13 to Apr 3, 2021',
  SEP17_TO_OCT9_2021: 'Sep 17 to Oct 9, 2021',
  NONE_OF_THE_ABOVE: 'None of the above',
}

export const transformDateLaunchToReadable = (d) => {
  return readable[d]
}

export default dateLaunch
