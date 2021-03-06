import { getTrackingUrl } from './tracking';

describe('getTrackingUrl', () => {
    it('should return a correctly formatted URL', () => {
        const dummyMeta = {
            ophanPageId: 'k5nxn0mxg7ytwpkxuwms',
            ophanComponentId: 'ACQUISITIONS_EPIC',
            platformId: 'GUARDIAN_WEB',
            campaignCode:
                'gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet',
            abTestName: '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron',
            abTestVariant: 'v2_stay_quiet',
            referrerUrl:
                'http://localhost:3000/politics/2020/jan/17/uk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit',
        };
        const buttonBaseUrl = 'https://support.theguardian.com/contribute/climate-pledge-2019';

        const want =
            'https://support.theguardian.com/contribute/climate-pledge-2019?REFPVID=k5nxn0mxg7ytwpkxuwms&INTCMP=gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet&acquisitionData=%7B%22source%22%3A%22GUARDIAN_WEB%22%2C%22componentId%22%3A%22gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet%22%2C%22componentType%22%3A%22ACQUISITIONS_EPIC%22%2C%22campaignCode%22%3A%22gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet%22%2C%22abTest%22%3A%7B%22name%22%3A%222019-10-14_moment_climate_pledge__multi_UKUS_nonenviron%22%2C%22variant%22%3A%22v2_stay_quiet%22%7D%2C%22referrerPageviewId%22%3A%22k5nxn0mxg7ytwpkxuwms%22%2C%22referrerUrl%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Fpolitics%2F2020%2Fjan%2F17%2Fuk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit%22%7D';

        const got = getTrackingUrl(buttonBaseUrl, dummyMeta);

        expect(got).toEqual(want);
    });
});
