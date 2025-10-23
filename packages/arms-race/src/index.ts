import {InstantRespawn} from '@bf6-portal-contrib/gate';
export * from '@bf6-portal-contrib/gate/hooks';

import { ArmsRace } from './arms-race.ts';

new ArmsRace().subscribe();
new InstantRespawn().subscribe();