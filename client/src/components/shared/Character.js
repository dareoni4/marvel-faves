import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { addItem, removeItem } from '../../store';
import MaterialIcon from '@material/react-material-icon';

/**
 * Display a character, both in search results
 * and user page.
 *
 * @param {Object} props            Component properties.
 * @param {String} props.context    Context of display, `search` or `faves`, `likes` or `dislikes`.
 * @param {Object} props.id         Character ID.
 * @param {Object} props.name       Character name.
 * @param {Object} props.thumb      Thumbnail image URL.
 * @param {Object} props.link       Link to more info.
 * @param {Object} props.comicsNum  Number of comics appeared in.
 * @param {Object} props.seriesNum  Number of series appeared in.
 * @param {Object} props.storiesNum Number of stories appeared in.
 */
class Character extends Component {
    /**
     * Add to faves, likes, or dislikes.
     *
     * @param {String} type Type of item to add, `faves`, `likes` or `dislikes`.
     */
    handleClick(type) {
        const {
            addItem,
            removeItem,
            user,
            id,
            name,
            thumb,
            link,
            comicsNum,
            seriesNum,
            storiesNum
        } = this.props;

        if (
            (type === 'faves' && this.isFaved()) ||
            (type === 'likes' && this.isLiked()) ||
            (type === 'dislikes' && this.isDisliked())
        ) {
            removeItem(type, user._id, id);
        } else {
            addItem(type, user._id, {
                id,
                name,
                thumb,
                link,
                comicsNum,
                seriesNum,
                storiesNum
            });
        }
    }

    /**
     * Within the context of a profile, remove the
     * current item from its section.
     */
    removeFromProfile = event => {
        event.preventDefault();
        const { removeItem, context, user, id } = this.props;
        removeItem(context, user._id, id);
    };

    /**
     * Is the current character faved by the
     * current user?
     */
    isFaved = () => {
        const faves = this.props.user.faves;

        if (faves.find(fave => fave.id === this.props.id)) {
            return true;
        }

        return false;
    };

    /**
     * Is the current character liked by the
     * current user?
     */
    isLiked = () => {
        const likes = this.props.user.likes;

        if (likes.find(like => like.id === this.props.id)) {
            return true;
        }

        return false;
    };

    /**
     * Is the current character disliked by the
     * current user?
     */
    isDisliked = () => {
        const dislikes = this.props.user.dislikes;

        if (dislikes.find(dislike => dislike.id === this.props.id)) {
            return true;
        }

        return false;
    };

    /**
     * Render component.
     *
     * @return {Component}
     */
    render() {
        const {
            user,
            context,
            name,
            thumb,
            link,
            comicsNum,
            seriesNum,
            storiesNum
        } = this.props;

        const comics =
            comicsNum === 1 ? `${comicsNum} comic` : `${comicsNum} comics`;

        const stories =
            storiesNum === 1 ? `${storiesNum} story` : `${storiesNum} stories`;

        const characterClassNames = classNames({
            character: true,
            'is-faved': this.isFaved(),
            'is-liked': this.isLiked(),
            'is-disliked': this.isDisliked()
        });

        return (
            <li className={characterClassNames}>
                {context === 'search' &&
                    user.isLoggedIn && (
                        <span className="actions-menu">
                            <ul>
                                <li>
                                    <a
                                        href="add-fave"
                                        className="action-fave"
                                        onClick={e => {
                                            e.preventDefault();
                                            this.handleClick('faves');
                                        }}
                                    >
                                        <MaterialIcon
                                            icon={
                                                this.isFaved()
                                                    ? 'favorite'
                                                    : 'favorite_border'
                                            }
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#add-like"
                                        className="action-like"
                                        onClick={e => {
                                            e.preventDefault();
                                            this.handleClick('likes');
                                        }}
                                    >
                                        <MaterialIcon icon="thumb_up" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#remove-like"
                                        className="action-dislike"
                                        onClick={e => {
                                            e.preventDefault();
                                            this.handleClick('dislikes');
                                        }}
                                    >
                                        <MaterialIcon icon="thumb_down" />
                                    </a>
                                </li>
                            </ul>
                        </span>
                    )}
                <span className="avatar">
                    <img src={thumb} alt={name} />
                </span>
                <span className="info">
                    <span className="h2 name">{name}</span>
                    <span className="meta">
                        Has appeared in {comics}, {stories}, and {seriesNum}{' '}
                        series.{' '}
                        {link && (
                            <a
                                href={link}
                                title={`Learn more about ${name}`}
                                target="_blank"
                            >
                                Learn More
                            </a>
                        )}
                    </span>
                </span>
                {context !== 'search' && (
                    <span class="remove">
                        <a href="#remove-item" onClick={this.removeFromProfile}>
                            <MaterialIcon icon="delete_forever" size="48" />
                        </a>
                    </span>
                )}
            </li>
        );
    }
}

export default connect(
    state => ({ user: { ...state } }),
    { addItem, removeItem }
)(Character);
