import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'app-planet-avatar',
    standalone: true,
    templateUrl: './planet-avatar.component.html',
    styleUrl: './planet-avatar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetAvatarComponent {
    public imageUrl = input.required<string>();
    public planetName = input.required<string>();

    public avatarSize = input<number>(80);
}
