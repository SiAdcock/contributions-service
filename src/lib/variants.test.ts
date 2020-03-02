import { findVariant, Test, EpicTests } from './variants';
import { EpicTargeting } from '../components/ContributionsEpicTypes';

const test1: Test = {
    name: 'example-1',
    isOn: true,
    locations: [],
    audience: 1,
    tagIds: [],
    sections: ['environment'],
    excludedTagIds: [],
    excludedSections: [],
    alwaysAsk: true,
    maxViews: {
        maxViewsCount: 4,
        maxViewsDays: 30,
        minDaysBetweenViews: 0,
    },
    userCohort: 'AllNonSupporters',
    isLiveBlog: false,
    hasCountryName: false,
    variants: [
        {
            name: 'control-example-1',
            heading: "We've got an announcement…",
            paragraphs: [
                '… on our progress as an organisation. In service of the escalating climate emergency, we have made an important decision – <a href="https://www.theguardian.com/media/2020/jan/29/guardian-to-ban-advertising-from-fossil-fuel-firms-climate-crisis#show-draft-epics">to renounce fossil fuel advertising</a>, becoming the first major global news organisation to institute an outright ban on taking money from companies that extract fossil fuels.',
                '',
            ],
            highlightedText:
                'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – and it only takes a minute. Thank you.',
            showTicker: false,
            cta: {
                text: 'Support The Guardian',
                baseUrl: 'https://support.theguardian.com/contribute',
            },
            secondaryCta: {
                text: 'Read our pledge',
                baseUrl:
                    'https://www.theguardian.com/environment/ng-interactive/2019/oct/16/the-guardians-climate-pledge-2019?INTCMP=pledge_Jan_2020',
            },
        },
    ],
    highPriority: false,
    useLocalViewLog: false,
    articlesViewedSettings: {
        minViews: 5,
        periodInWeeks: 52,
    },
};

const targeting: EpicTargeting = {
    contentType: 'Article',
    sectionName: 'environment',
    shouldHideReaderRevenue: false,
    isMinuteArticle: false,
    isPaidContent: false,
    tags: [{ id: 'environment/series/the-polluters', type: 'tone' }],
    showSupportMessaging: true,
    isRecurringContributor: false,
    lastOneOffContributionDate: undefined,
};

type EpicTargetingOptions = Partial<EpicTargeting>;
type TestOptions = Partial<Test>;

const buildTargeting = (
    targeting: EpicTargeting,
    overrides: EpicTargetingOptions,
): EpicTargeting => {
    return { ...targeting, ...overrides };
};

const buildTests = (test: Test, overrides: TestOptions, suite: Test[] = []): EpicTests => {
    const updated: Test = { ...test, ...overrides };
    const tests: Test[] = [];
    return { tests: tests.concat([updated], suite) };
};

describe('find variant', () => {
    it.skip('should filter by max views conditions', () => {});
    it.skip('should filter by country group match', () => {});

    it('should filter by required sections', () => {
        const mvtId = 2; // MVT IDs are 0..10^6

        const targ1 = buildTargeting(targeting, { sectionName: 'environment' });
        const tests1 = buildTests(test1, { sections: ['environment'] });
        const got1 = findVariant(tests1, targ1, mvtId);

        expect(got1?.name).toBe('control-example-1');

        const targ2 = buildTargeting(targeting, { sectionName: 'football' });
        const tests2 = buildTests(test1, { sections: ['environment'] });
        const got2 = findVariant(tests2, targ2, mvtId);

        expect(got2).toBe(undefined);
    });

    it('should filter by required tags', () => {
        const mvtId = 2; // MVT IDs are 0..10^6

        const targ1 = buildTargeting(targeting, {
            tags: [{ id: 'environment/series/the-polluters', type: 'tone' }],
        });

        const tests1 = buildTests(test1, { tagIds: ['environment/series/the-polluters'] });
        const got1 = findVariant(tests1, targ1, mvtId);

        expect(got1?.name).toBe('control-example-1');

        const targ2 = buildTargeting(targeting, {
            tags: [{ id: 'environment/series/the-polluters', type: 'tone' }],
        });
        const tests2 = buildTests(test1, { sections: ['football'] });
        const got2 = findVariant(tests2, targ2, mvtId);

        expect(got2).toBe(undefined);
    });

    it('should filter by excluded sections', () => {
        const mvtId = 2; // MVT IDs are 0..10^6

        const targ1 = buildTargeting(targeting, { sectionName: 'environment' });
        const tests1 = buildTests(test1, { excludedSections: ['football'] });
        const got1 = findVariant(tests1, targ1, mvtId);

        expect(got1?.name).toBe('control-example-1');

        const targ2 = buildTargeting(targeting, { sectionName: 'environment' });
        const tests2 = buildTests(test1, { excludedSections: ['environment'] });
        const got2 = findVariant(tests2, targ2, mvtId);

        expect(got2).toBe(undefined);
    });

    it('should filter by excluded tags', () => {
        const mvtId = 2; // MVT IDs are 0..10^6

        const targ1 = buildTargeting(targeting, {
            tags: [{ id: 'football/football', type: 'tone' }],
        });

        const tests1 = buildTests(test1, { excludedTagIds: ['environment/series/the-polluters'] });
        const got1 = findVariant(tests1, targ1, mvtId);

        expect(got1?.name).toBe('control-example-1');

        const targ2 = buildTargeting(targeting, {
            tags: [{ id: 'football/football', type: 'tone' }],
        });
        const tests2 = buildTests(test1, { excludedTagIds: ['football/football'] });
        const got2 = findVariant(tests2, targ2, mvtId);

        expect(got2).toBe(undefined);
    });
    it.skip('should filter by copy is valid', () => {});
});