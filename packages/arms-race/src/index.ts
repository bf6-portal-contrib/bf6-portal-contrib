export * from '@bf6-portal-contrib/gate/hooks';

import { ArmsRace } from './arms-race.ts';
import { UIDebug } from './ui-debug.ts';

new ArmsRace().subscribe();
new UIDebug().subscribe();